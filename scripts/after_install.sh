echo "after install script"
cd /home/ec2-user/todo-app

# Fetch Environment Variables
# Load ENV variable from the artifact

if [ -f envfile ]; then
  export $(cat envfile | xargs)
fi

echo "Using ENVIRONMENT=$ENVIRONMENT"

echo "Install Dependencies"
npm install


DATABASE_URL=$(aws ssm get-parameter --name "/todo-app/$ENVIRONMENT/DATABASE_URL" --with-decryption --query "Parameter.Value" --output text)
export DATABASE_URL=$DATABASE_URL

# create env variable
echo "DATABASE_URL=$DATABASE_URL" > .env

# generate prisma client
echo "Generate Prisma Client"
echo "npx prisma generate"

# push migration
echo "Prisma Migrate Deploy"
npx prisma migrate deploy --schema=prisma/schema.prisma
