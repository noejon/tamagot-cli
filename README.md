# tamagotcli

## About this project

We are creating a CLI to raise a pet tamagotcli.
A tamagotchi hatches from an egg, after what it will go through all stages of life:

- baby.
- child.
- teenage.
- adult.

It can unfortunately also die. There are two reasons for our pet to die:

- age, in which case the game is won.
- poor care, in which case the game is lost.

Here is how we can interact with the tamagotcli:

- feed it.
- play with it.
- clean it.
- take it to bed.
- make it do it's toilet.

Some actions will be performed by the animal itself when time comes:

- it will poo when it has eaten too much. It does not prompt us when it does so.
- it will go to bed when it's tiredness is at its peak.

The health of a pet starts to decline when the following happens:

- it is hungry.
- it is sad.
- it is surrounded by poop.
- it's tiredness level is between the sleepy phase and the peak.

The only way to regain health is to have a clean, well fed, happy and not tired pet. As long as all the values combined are above a certain treshold, the health will rise.

## Project setup

### Nodejs

You will need to have the lts version of nodejs installed. You can get it either by [downloading it from here](https://nodejs.org), using [nvm](https://github.com/creationix/nvm) for Linux and macOS.
To install nvm, you can follow the [nvm install script tutorial](https://github.com/creationix/nvm#install-script).

When you have nvm installed, run the following command:

```zsh
nvm install --lts
nvm use
```

In subsequent sessions, run `nvm use` to switch to node lts.

Follow the [official documentation](https://docs.microsoft.com/en-us/windows/nodejs/setup-on-windows) on a windows operating system.
