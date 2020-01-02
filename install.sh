#!/usr/bin/env bash

{ # this ensures the entire script is downloaded #

	set -e

	command_exists() { command -v "$@" >/dev/null 2>&1; }

	if ! command_exists npm; then
		curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh | bash
		export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
		[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
		nvm i node
	fi
	echo "Node version $(node --version)"

	if ! command_exists btc-network; then
		npm i @iamnapo/btc-network -g
	fi
	echo "btc-network version $(btc-network --version)"

	if ! command_exists docker; then
		curl -fsSL https://get.docker.com -o get-docker.sh
		sh get-docker.sh
		sudo usermod -aG docker $USER
	fi
	echo "$(docker --version)"

	if ! command_exists docker-compose; then
		sudo curl -L https://github.com/docker/compose/releases/download/1.25.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
		sudo chmod +x /usr/local/bin/docker-compose
	fi
	echo "$(docker-compose --version)"

	set +e

} # this ensures the entire script is downloaded #
