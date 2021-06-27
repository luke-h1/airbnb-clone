#!/bin/bash
sudo apt install cloud-guest-utils -y 
sudo growpart /dev/xvda 16 # resize to 16gb
sudo resize2fs /dev/xvda1
df -h
lsblk
