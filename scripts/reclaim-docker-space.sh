#!/bin/bash

# Remove all unused containers, networks, images (both dangling and unreferenced), and optionally, volumes.

# -a = Remove all unused images not just dangling ones

sudo docker system prune -a