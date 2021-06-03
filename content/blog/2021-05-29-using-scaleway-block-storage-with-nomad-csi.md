---
title: Nomad CSI with Scaleway
description: Using Scaleway Block Storage with Nomad CSI
date: 2021-05-29T18:15:00.000Z
category: Projects
featuredImage: ../assets/uploads/nomad_csi_scaleway.png
published: true
---
I've been an early adopter of Nomad and Scaleway, use them for both personal and professional workloads and I've been very happy with both so far however there was a limitation until recently...

Running stateless services was not possible until the release of [Nomad 0.11](https://www.hashicorp.com/blog/hashicorp-nomad-container-storage-interface-csi-beta) and Scaleway support for Block Storage on Kubernetes.

Using CSI with Nomad is still in Beta, as I am writing nomad is at version [1.1.0](https://github.com/hashicorp/nomad/releases/tag/v1.1.0) and they have been releasing improvements and bug fixing for their integration, some of the limitations and headaches that I faced during the integration of both are now solved.

## How CSI works on Nomad?

Nomad CSI works by registering a controller plugin (coordinate block storage volumes)  and a node plugin (mounting block storage on nodes), Nomad already provides documentation on how to do it on [AWS](https://learn.hashicorp.com/tutorials/nomad/stateful-workloads-csi-volumes?in=nomad/stateful-workloads). 

## Nomad with Scaleway

Scaleway implements also its version of CSI.

The following templates are based on the Nomad documentation with a few tweaks.

The major changes are:  

* Docker image was replaced with the one supported by scaleway [scaleway/scaleway-csi:master](https://github.com/scaleway/scaleway-csi)
* Appropriate environment variables added so CSI plugin can register volumes on the scaleway platform ([taken from here](https://github.com/scaleway/scaleway-csi/blob/master/deploy/kubernetes/scaleway-secret.yaml))

Environment variables must be populated accordingly with the following values:

* SCW_ACCESS_KEY, SCW_SECRET_KEY

  Available after the generation of an account [API Key](https://console.scaleway.com/project/credentials)
* SCW_DEFAULT_PROJECT_ID

  Account [Project ID](https://console.scaleway.com/project/settings)
* SCW_DEFAULT_ZONE

  [Zone](https://registry.terraform.io/providers/scaleway/scaleway/latest/docs/guides/regions_and_zones#zones) (fr-par-1, fr-par-2, ...)

`nomad job run plugin-scaleway-bs-controller.hcl`

```hcl
job "plugin-scaleway-bs-controller" {
  datacenters = ["scaleway-fr1"]

  group "controller" {
    task "plugin" {
      driver = "docker"

      env {
        SCW_ACCESS_KEY = "REPLACE_WITH_SCALEWAY_GENERATED_ACCESS_KEY"
        SCW_SECRET_KEY = "REPLACE_WITH_SCALEWAY_GENERATED_SECRET_KEY"
        # Project ID could also be an Organization ID
        SCW_DEFAULT_PROJECT_ID = "SCALEWAY_PROJECT_ID"
        # The default zone where the block volumes will be created, ex: fr-par-1
        SCW_DEFAULT_ZONE = "SCALEWAY_DEFAULT_ZONE"
      }

      config {
        image = "scaleway/scaleway-csi:master"

        args = [
          "--mode=controller",
          "--endpoint=unix://csi/csi.sock",
          "--logtostderr",
          "--v=5",
        ]
      }

      csi_plugin {
        id        = "csi.scaleway.com"
        type      = "controller"
        mount_dir = "/csi"
      }

      resources {
        cpu    = 64
        memory = 64
      }
    }
  }
}
```

`nomad job run plugin-scaleway-bs-nodes.hcl`
```hcl
job "plugin-scaleway-bs-nodes" {
  datacenters = ["scaleway-fr1"]

  # you can run node plugins as service jobs as well, but this ensures
  # that all nodes in the DC have a copy.
  type = "system"

  # only one plugin of a given type and ID should be deployed on
  # any given client node
  #constraint {
  #  operator = "distinct_hosts"
  #  value = true
  #}

  group "nodes" {
    task "plugin" {
      driver = "docker"

      env {
        SCW_ACCESS_KEY = "REPLACE_WITH_SCALEWAY_GENERATED_ACCESS_KEY"
        SCW_SECRET_KEY = "REPLACE_WITH_SCALEWAY_GENERATED_SECRET_KEY"
        # Project ID could also be an Organization ID
        SCW_DEFAULT_PROJECT_ID = "SCALEWAY_PROJECT_ID"
        # The default zone where the block volumes will be created, ex: fr-par-1
        SCW_DEFAULT_ZONE = "SCALEWAY_DEFAULT_ZONE"
      }

      config {
        image = "scaleway/scaleway-csi:master"

        args = [
          "--mode=node",
          "--endpoint=unix://csi/csi.sock",
          "--logtostderr",
          "--v=5",
        ]

        # node plugins must run as privileged jobs because they
        # mount disks to the host
        privileged = true
      }

      csi_plugin {
        id        = "csi.scaleway.com"
        type      = "node"
        mount_dir = "/csi"
      }

      resources {
        cpu    = 64
        memory = 64
      }
    }
  }
}
```

`nomad volume create block-storage-v1.hcl`

```hcl
# volume registration
type = "csi"
id = "block-storage-v1"
name = "block-storage-v1"
external_id = "fr-par-1/6142201f-6902-4aba-bcc7-e49c15234206"
plugin_id = "csi.scaleway.com"
zone = "fr-par-1"
capacity_max = "25G"
capacity_min = "25G"
access_mode = "single-node-writer"
attachment_mode = "file-system"

capability {
  access_mode     = "single-node-writer"
  attachment_mode = "file-system"
}
```

## Running a job using CSI

The following template will schedule a container using mongodb docker image listening on port 27017. 

```hcl
job "mongodb-scw-fr1" {
  datacenters = ["scaleway-fr1"]
  type        = "service"

  update {
    stagger      = "10s"
    max_parallel = 1
  }

  group "nosql" {
    count = 1

    network {
      port "db" {
        to = 27017
        static = 27017
      }
    }

    volume "MongoDB" {
      type      = "csi"
      read_only = false
      source    = "block-storage-v1"
      attachment_mode = "file-system"
      access_mode     = "single-node-writer"
    }

    restart {
      attempts = 10
      interval = "5m"
      delay    = "25s"
      mode     = "delay"
    }

    task "mongo" {
      driver = "docker"

      volume_mount {
        volume      = "MongoDB"
        destination = "/data/db"
        read_only   = false
      }

      config {
        image = "mongo:4.4"
        ports = ["db"]
      }

      resources {
        cpu    = 512
        memory = 768
      }

      service {
        name = "mongodb-scw-fr1"
        tags = ["db", "nosql", "mongodb"]
        port = "db"

        check {
          type     = "tcp"
          interval = "10s"
          timeout  = "4s"
        }
      }
    }
  }
}
```

## Known and detected problems
- When migrating volume(s) between nodes there's downtime while nomad attempts to migrate the volume(s)
- It might happen during a volume migration it won't schedule properly, when it happens manual remediations should be taken such as deregistering the volume `nomad volume deregister -force volume_name` and registering it again.