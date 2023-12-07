const { authRegisterController } = require('../../controllers/auth')
const user = require('../../database/schemas/User')
const {hashPass} = require('../../utils/helper')




jest.mock('../../utils/helper', () => ({
 hashPass: jest.fn((x) => x),
}))

jest.mock('../../database/schemas/User')
const reqBody = {
  body: {
    email: 'yocorangeklo2@gmail.com',
    password: 'aabsduabwueybfuashda'
  }
}
const response = {
  status: jest.fn((x) => x),
  send: jest.fn((x) => x)
}
it('should send a status ode of 400 when user exist', async () => {
  user.findOne.mockImplementationOnce(() => (
    {
      id: 1,
      email: 'yocorangeklo2@gmail.com',
      password: 'aabsduabwueybfuashda'
    }
  ));
  await authRegisterController(reqBody, response)
  expect(response.status).toHaveBeenCalledWith(401)
  expect(response.send).toHaveBeenCalledTimes(1)
})

it('should be send a status of 201 when user is created', async () => {
  user.findOne.mockImplementationOnce(undefined);
  user.create.mockResolvedValueOnce(
    {
      id: 1,
      email: 'email',
      password: 'password'
    });
  await authRegisterController(reqBody, response)
  expect(hashPass).toHaveBeenCalledWith('fake password')
})