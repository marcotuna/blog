#!/bin/bash

gp await-port 9081 && \
    echo "Setting CMS_PROXY_URL with $(gp url 9081)"; \
    export CMS_PROXY_URL=$(gp url 9081)