rm -rf ../api/app/static/*
rm -rf ../api/app/templates/*
mkdir ../api/app/static/uploads
cp -r build/static/* ../api/app/static
cp build/*.* ../api/app/static
cp build/*.* ../api/app/templates
