---
title: Simple Vagrant setup for Rails applications
date: 2015-01-23
language: en
---

There are many reasons on why you should use Vagrant for your development, as described [here](https://docs.vagrantup.com/v2/why-vagrant) and [here](http://superuser.com/a/588334).

In order to get your Rails application running in Vagrant, the VM needs to have several components installed, such as: Ruby, Rails, a database, etc. One of the most common ways to provision (install the necessary packages) your VM is via Puppet of Chef. However, not everyone knows them well, and luckily there is an easy approach, namely to use shell scripts.

In a terminal window navigate to your existing Rails application and run the following command (don't worry, Vagrant will not break your existing Rails project):

```bash
$ vagrant init
 
A `Vagrantfile` has been placed in this directory. You are now
 ready to `vagrant up` your first virtual environment! Please read
 the comments in the Vagrantfile as well as documentation on
 `vagrantup.com` for more information on using Vagrant.
```

Like the output mentions, the command creates a file called 'Vagrantfile' in the current directory. Open it and read through the comments in order to get familiar with the available options. You will notice that all configuration is done in Ruby.

The first thing we need to do is to instruct Vagrant which OS to install. Edit the Vagrantfile and change the line config.vm.box = "base" with

```bash
config.vm.box = "ubuntu/trusty64"
```

You can also [search for available Vagrant VMs](https://atlas.hashicorp.com/boxes/search?utf8=✓&sort=&provider=&q=ubuntu).

Next, we need to forward port 3000, in order to be able to access the Rails server in a browser outside the VM. We also want to tell Vagrant how it should provision our VM. To do that, add the next lines to the Vagrantfile:

```bash
config.vm.network 'forwarded_port', guest: 3000, host: 3000
config.vm.provision 'shell', path: 'bootstrap/bootstrap_vagrant.sh'
```

Now, it's time to create the file bootstrap/bootstrap\_vagrant.sh inside the root folder of your Rails application. The commands we place in this file will be executed when the VM will be provisioned.

An easy way to tell the provisioning script to only install packages it didn't install already is to organize it in blocks. When a block completes it will track the progress by writing a tag to a temporary file, for instance the .provisioning-progress file.

Here is a basic example that installs Ruby (downloads the binary and compiles it):

```bash
# Install ruby
if grep -q +ruby/2.1.5 .provisioning-progress; then
  echo "--> ruby-2.1.5 is installed, moving on."
else
  echo "--> Installing ruby-2.1.5 ..."
  su vagrant -c "mkdir -p /home/vagrant/downloads; cd /home/vagrant/downloads; \
                 wget --no-check-certificate https://ftp.ruby-lang.org/pub/ruby/2.1/ruby-2.1.5.tar.gz; \
                 tar -xvf ruby-2.1.5.tar.gz; cd ruby-2.1.5; \
                 mkdir -p /home/vagrant/ruby; \
                 ./configure --prefix=/home/vagrant/ruby --disable-install-doc; \
                 make; make install"
  sudo -u vagrant printf 'export PATH=/home/vagrant/ruby/bin:$PATH\n' >> /home/vagrant/.profile
 
  su vagrant -c "echo +ruby/2.1.5 >> /home/vagrant/.provisioning-progress"
  echo "--> ruby-2.1.5 is now installed."
fi
```

As you can see, the script first checks the .provisioning-progress file for the tag +ruby/2.1.5. If it finds it then it skips the install (the whole block). Otherwise it installs and appends +ruby/2.1.5 to the .provisioning\_progress file after it finishes. In this way, the next time you provision your VM it will detect that Ruby is already installed and will skip this block. Similarly we can group our requirements and define setup blocks:

- Set system locale
- Install core libraries
- Install a database
- Install Ruby
- Install Bundler and bundle the application
- Run the migrations

Therefore our `bootstrap_vagrant.sh` script will have several blocks. At this gist: [https://gist.github.com/luciancancescu/57025d19da727cfdc18f](https://gist.github.com/luciancancescu/57025d19da727cfdc18f) you will find an example that works for a new "blog" rails application. To get started copy the entire gist to your project and begin customising it.

**Important:** by default the provisioning script is run as user root.

After you have the provisioning script in place you can run:

```bash
vagrant up
```

This will create a VM and will start provisioning it. When it finishes you can start your Rails application like:

```bash
vagrant ssh
cd /vagrant
bin/rails s
```

In a browser open [lvh.me:3000](http://lvh.me:3000) and you should see the homepage of your Rails application. (read more about Lvh.me [here](https://coderwall.com/p/-neplg/use-lvh-me-for-local-subdomain-testing))

**Note**: The first time you run vagrant up it performs the provisioning. If you want to run the provisioning script again simply run vagrant provision.

**Bonus 1**: If you need to install something new in the VM don't to it by hand. Instead add the install commands in new block in the provisioning script file and from outside the VM run:

```bash
vagrant provision
```

This will print a message for each of the existing blocks saying that it is installed and will only install the new package you added.

**Bonus 2:** If for some reason you want to reinstall an already installed package just delete the corresponding block tag from ~/vagrant/.provisioning-progress and rerun vagrant provision.

Happy provisioning! If you have any suggestions or alternatives leave a reply in the comments box below.
