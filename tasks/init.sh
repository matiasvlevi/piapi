curl -o ./.apirc https://gist.githubusercontent.com/matiasvlevi/821d40a221e404208b9f2e713f230598/raw/6044dec5bcec8d2302693bf1e7990b127b7ae2c6/.apirc
echo "Created '.apirc' file"
curl -o ./.env https://gist.githubusercontent.com/matiasvlevi/179936cd9818c257974b5abd108b0be8/raw/bb7188856a499a0b8f5e934300a27497c0271596/pilog.env
echo "Created '.env' file"

echo "Installing dependencies: "
npm ci

echo "Building source"
tsc -p .