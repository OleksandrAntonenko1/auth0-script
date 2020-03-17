const axios = require("axios");
const {getCredentials} = require("../constatns/credentials");

const createUser = async (id, authorizationHeader, url) => {
  try {
    const data = {
      connection: "test",
      email: `test1000-${id}@test.test`,
      username: `test1000-${id}`,
      password: "Aasa1@1sdf",
      user_metadata: {test: "test", a: `test1000-${id}`}
    };

    const {data: {user_id}} = await axios.post(`${url}/api/v2/users`, data,
      {
        headers: {
          authorization: authorizationHeader
        }
      }
    );

    console.log(id, user_id);
  } catch (e) {
    throw new Error(e)
  }
};

const main = async () => {
  const {url, authorizationHeader} = await getCredentials();

  for (let i = 1500; i < 2000; i++){
    try {
      await createUser(i, authorizationHeader, url);
    } catch (e) {
      console.log(i);
      console.log(e);
    }
  }
};

main();
