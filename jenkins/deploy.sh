# .bash_profile
# Get the aliases and functions
sudo docker stop frontend  | echo "SUCCESS"
sudo docker rm frontend | echo "SUCCESS"
echo "y" | sudo docker system prune
sudo docker network create myNetwork  | echo "SUCCESS"
sudo docker pull 80869538/frontend
sudo docker run -d -p 80:80 --name frontend --net=myNetwork 80869538/frontend:latest

