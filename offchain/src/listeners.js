import apiGateway from './rest/api-gateway';

const addFToken = async (data, userData) => {
  try {
    console.log('\noffchain/src/listeners.js', '\naddFToken', '\ndata', data);

    await apiGateway.addFToken( 
      {
        authorization: userData.jwtToken,
      },
      {
        amount: data.amount,
        shield_contract_address: data.shield_contract_address,
        transferor: data.transferor,
        transferor_address: data.transferor_address,
        is_received: true,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const addNFTToken = async (data, userData) => {
  try {
    console.log('\noffchain/src/listeners.js', '\naddNFTToken', '\ndata', data);

    await apiGateway.addNFTToken(
      {
        authorization: userData.jwtToken,
      },
      {
        uri: data.uri,
        token_id: data.token_id,
        shield_contract_address: data.shield_contract_address,
        transferor: data.transferor,
        transferor_address: data.transferor_address,
        is_received: true,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const addToken = async (data, userData) => {
  try {
    console.log('\noffchain/src/listeners.js', '\naddToken', '\ndata', data, '\nuserData', userData);

    const correctnessChecks = await apiGateway.checkCorrectnessToken(
      {
        authorization: userData.jwtToken,
      },
      {
        A: data.A,
        pk: data.pk,
        S_A: data.S_A,
        z_A: data.z_A,
        z_A_index: data.z_A_index,
      },
    );

    console.log(
      '\noffchain/src/listeners.js',
      '\naddToken',
      '\ncorrectnessChecks',
      correctnessChecks,
    );

    await apiGateway.addToken(
      {
        authorization: userData.jwtToken,
      }, 
      {
        tokenUri: data.tokenUri,
        A: data.A,
        S_A: data.S_A,
        pk: data.pk,
        z_A: data.z_A,
        z_A_index: data.z_A_index,
        is_received: true,
        ...correctnessChecks.data,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const addCoin = async (data, userData) => {
  try {
    console.log('\noffchain/src/listeners.js', '\naddCoin', '\ndata', data, '\nuserData', userData);

    const correctnessChecks = await apiGateway.checkCorrectnessCoin(
      {
        authorization: userData.jwtToken,
      },
      {
        E: data.E,
        S_E: data.S_E,
        pk: data.pk,
        z_E: data.z_E,
        z_E_index: data.z_E_index,
      },
    );

    console.log(
      '\noffchain/src/listeners.js',
      '\naddCoin',
      '\ncorrectnessChecks',
      correctnessChecks,
    );

    await apiGateway.addCoin(
      {
        authorization: userData.jwtToken,
      },
      {
        E: data.E,
        S_E: data.S_E,
        pk: data.pk,
        z_E: data.z_E,
        z_E_index: data.z_E_index,
        is_received: true,
        action_type: 'received',
        toSave: 'receiverSide',
        ...correctnessChecks.data,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const listeners = async (data, userData) => {
  console.log('\noffchain/src/listeners.js', '\nlisteners', '\ndata', data, '\nuserData', userData);

  const actualPayload = data.payload;
  switch (actualPayload.for) {
    case 'coin':
      await addCoin(actualPayload, userData);
      break;
    case 'token':
      await addToken(actualPayload, userData);
      break;
    case 'NFTToken':
      await addNFTToken(actualPayload, userData);
      break;
    case 'FToken':
      await addFToken(actualPayload, userData);
      break;
    default:
      throw Error('payload.for is invalid');
  }
};

export default listeners;
