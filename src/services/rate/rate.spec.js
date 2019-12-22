/* eslint-disable arrow-body-style */
const httpStatus = require('http-status');
const service = require('./rate.service');
const Rate = require('../../models/Rate')


describe('Service - rate', () => {

  const returnObject = {
    currencyName: 'US Dollar',
    symbol: '$',
    price: 7137.03,
    createdAt: '2019-12-20T07:40:17.959Z',
    id: '5dfc7ae1a3c67a8d35d9b59a'
  }

  beforeEach(() => { });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return the latest rate', async () => {
    Rate.findOne = jest.fn().mockImplementationOnce(() => ({ sort: jest.fn().mockResolvedValueOnce(returnObject) }));
    return await service.latest().then((response) => {
      expect(response).toBeObject();
      expect(response).toContainKey('price');
    });
  });

  it('should return the rate', async () => {
    Rate.find = jest.fn().mockImplementationOnce(() => ({
      skip: jest.fn().mockImplementationOnce(() => ({
        limit: jest.fn().mockImplementationOnce(() => ({
          sort: jest.fn().mockResolvedValueOnce([returnObject])
        }))
      }))
    }));
    const queryParams = {
      from: '2019-12-20T07:40:17.959Z', to: '2019-12-20T07:41:17.959Z', pageNumber: 1, pageSize: 10, sort: 'asc'
    };
    return await service.list(queryParams).then((response) => {
      expect(response).toBeArray();
      expect(response).toBeArrayOfSize(1);
      expect(response).toContain(returnObject);
    });
  });

  it('should return the rate desc', async () => {
    Rate.find = jest.fn().mockImplementationOnce(() => ({
      skip: jest.fn().mockImplementationOnce(() => ({
        limit: jest.fn().mockImplementationOnce(() => ({
          sort: jest.fn().mockResolvedValueOnce([returnObject])
        }))
      }))
    }));
    const queryParams = {
      from: '2019-12-20T07:40:17.959Z', to: '2019-12-20T07:41:17.959Z', pageNumber: 1, pageSize: 10, sort: 'desc'
    };
    return await service.list(queryParams).then((response) => {
      expect(response).toBeArray();
      expect(response).toBeArrayOfSize(1);
      expect(response).toContain(returnObject);
    });
  });



});
