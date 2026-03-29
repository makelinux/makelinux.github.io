#!/bin/sh

d=ubuntu-9-32
mkdir -p ~/$d/{proc,dev,home}
grep $d/dev /proc/mounts || sudo mount -o bind /dev ~/$d/dev
grep $d/proc /proc/mounts || sudo mount -o bind /proc/ ~/$d/proc
grep $d/home /proc/mounts || sudo mount -o bind /home ~/$d/home
sudo chroot --userspec=$USER ~/$d sh -c "cd $PWD; inkscape \"$@\" "
sudo umount ~/$d/proc
sudo umount ~/$d/home
sudo umount ~/$d/dev
