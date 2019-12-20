/* eslint-disable arrow-body-style */
const httpStatus = require('http-status');
const service = require('./rate.service');


describe('Service - rate', () => {

  const checkApiFailure = (apiError, errorCode = 'FEED_SERVICE_DOWN', status = httpStatus.BAD_REQUEST) => {
    expect(apiError).toHaveProperty('name');
    expect(apiError).toHaveProperty('errors');
    expect(apiError).toHaveProperty('status');
    expect(apiError).toHaveProperty('errors');
    expect(apiError).toHaveProperty('isPublic');
    expect(apiError).toHaveProperty('route');
    expect(apiError).toHaveProperty('isOperational');
    expect(apiError.name).toBe('APIError');
    expect(apiError.status).toBe(status);
    expect(apiError.errors).toBeArray();
    expect(apiError.errors).not.toHaveLength(0);
    expect(apiError.errors[0]).toHaveProperty('errorCode');
    expect(apiError.errors[0].errorCode).toBe(errorCode);
  };

  beforeEach(() => { });

  afterEach(() => {
    jest.resetAllMocks();
  });

  // it('it should throw API Error if database is not responding while list awani', () => {
  //   ArticleAwani.findAll = jest.fn(() => Promise.reject(new Error('Oops')));
  //   const queryParams = {
  //     site: AWANI, pageNumber, pageSize, sort
  //   };
  //   return service.listArticle(queryParams).catch((err) => {
  //     checkApiFailure(err, 'FEED_SERVICE_DOWN');
  //   });
  // });


  it('should return the list awani with pagination', () => {

    // return service.listRate().then((response) => {
    //   // expect(response).toBeArray();
    //   expect.arrayContaining({ id: 1, currency: "USD", price: 4.20 });
    // });
  });

  test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
    // expect(shoppingList).toContain('beer');
  });


});
