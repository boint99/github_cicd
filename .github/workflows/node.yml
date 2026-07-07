name: github-cicd

on:
  push:
    branches: [ "main" ]

jobs:
  build:
    runs-on: self-hosted

    defaults:
      run:
        shell: sudo -u github-runner bash -e {0}

    strategy:
      matrix:
        node-version: ['20.x']

    steps:
    - uses: actions/checkout@v4

    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'

    - name: Check user and permissions
      run: |
        echo "=== Current Running User ==="
        whoami

        echo "=== Current Working Directory ==="
        pwd

        echo "=== Check Workspace Write Permission ==="
        if [ -w . ]; then echo "Write access: YES"; else echo "Write access: NO"; fi

        echo "=== Check PM2 Status & Path ==="
        which pm2 || echo "PM2 is not in PATH"
        pm2 -v || echo "Failed to run PM2"


    - name: Install dependencies
      run: npm install

    - name: Create .env file
      run: echo "PORT=${{ secrets.PORT }}" > .env

    - name: Restart github CI/CD service
      run: sudo -u github-runner bash -c "pm2 restart github-cicd || pm2 start server.js --name github-cicd"
