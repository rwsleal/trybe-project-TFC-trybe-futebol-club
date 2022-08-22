import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import Teams from '../database/models/Teams';

chai.use(chaiHttp);

const { expect } = chai;

const teams = [
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
]

describe('Teams tests', () => {
  describe('Case a GET request is made', () => {

    beforeEach(() => {
      sinon.stub(Teams, 'findAll').resolves(teams as Teams[]);
    })
  
    afterEach(() => {
      sinon.restore();
    });

    it('should return status 200', async () => {
      const response = await chai.request(app)
        .get('/teams')

      expect(response.status).to.be.equal(200);
    });

    it('should return an array with all the teams', async () => {
      const response = await chai.request(app)
        .get('/teams')

      expect(response.body).deep.equal(teams);
    });
  })
})
