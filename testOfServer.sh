 gnome-terminal -- mongod &&
 sleep 5s &&
(gnome-terminal -- npm run mongo_test &
gnome-terminal -- npm run todolistapi_test &)