#!/usr/bin/env bash

{ # this ensures the entire script is downloaded #

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

	if ! command_exists docker || ! command_exists docker-compose; then
		curl -fsSL https://get.docker.com -o get-docker.sh
		sh get-docker.sh
	fi
	echo "$(docker --version)"
	echo "$(docker-compose --version)"

} # this ensures the entire script is downloaded #
