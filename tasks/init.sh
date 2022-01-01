curl -o ./.apirc https://gist.githubusercontent.com/matiasvlevi/821d40a221e404208b9f2e713f230598/raw/4b2f3ae469388d15967427fe32d016a9492d6afc/.apirc
echo "Created '.apirc' file"
curl -o ./.env https://gist.githubusercontent.com/matiasvlevi/179936cd9818c257974b5abd108b0be8/raw/8c478f2e55693c7777cb24fdc77baf524d81a4de/pilog.env
echo "Created '.env' file"

echo "Installing dependencies: "
npm ci

echo "Building source"
tsc -p .