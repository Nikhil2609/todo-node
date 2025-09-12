echo "after install script"
cd /home/ec2-user/project-api

echo "ec2-user as owner of project-api"
sudo chown -R ec2-user:ec2-user /home/ec2-user/project-api

echo "Install Dependencies"
npm install

# generate prisma client
echo "Generate Prisma Client"
echo "npx prisma generate"

# push migration
echo "Prisma Migrate Deploy"
npx prisma migrate deploy --schema=prisma/schema.prisma
