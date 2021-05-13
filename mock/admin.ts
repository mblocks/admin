import Mock from 'mockjs';
import { Request, Response } from 'express';

export default {
  'GET /api/admin/apps': (req: Request, res: Response) => {
    //res.status(401);
    res.send(
      Mock.mock({
        total: 120,
        'data|20': [
          {
            id: '@id',
            title: '@title',
            path: '@name',
            endpoint: 'http://192.168.50.101/',
            services: [
              {
                id: '@id',
                name: 'main',
                title: 'main',
                image: 'some:latest',
                container_id: '@uuid',
                status: 'running',
                ip: '@ip',
              },
              {
                id: '@id',
                name: 'other',
                title: 'another service',
                image: 'some:latest',
                container_id: '@uuid',
                status: 'running',
                ip: '@ip',
              },
            ],
          },
        ],
      }),
    );
  },
  'POST /api/admin/apps/': (req: Request, res: Response) => {
    res.send({ ...req.body, id: new Date().getTime() + '' });
  },
  'GET /api/admin/apps/roles': (req: Request, res: Response) => {
    res.send([
      {
        name: 'photo',
        title: 'myphoto',
        roles: [
          { id: 11, title: 'xxxx11' },
          { id: 12, title: 'xxxx12' },
          { id: 13, title: 'xxxx13' },
          { id: 14, title: 'xxxx14' },
          { id: 15, title: 'xxxx15' },
        ],
      },
      {
        name: 'others',
        title: 'myothers',
        roles: [
          { id: 21, title: 'xxxx21' },
          { id: 22, title: 'xxxx22' },
          { id: 23, title: 'xxxx23' },
          { id: 24, title: 'xxxx24' },
          { id: 25, title: 'xxxx25' },
          { id: 26, title: 'xxxx26' },
        ],
      },
    ]);
  },
  'GET /api/admin/apps/:app_id': (req: Request, res: Response) => {
    //res.status(401);
    res.send({
      id: req.params.app_id,
      title: 'myphoto',
      path: '/photo',
      endpoint: 'http://192.168.50.101/',
      services: [
        {
          id: '11',
          name: 'main',
          title: 'main',
          image: 'some:latest',
          container_id: '5432545asdf7ew',
          status: 'running',
          ip: '10.5.12.25',
          environment: {
            database: '10.2.12.21',
            env: 'test',
          },
        },
        {
          id: '21',
          name: 'other',
          title: 'another service',
          image: 'some:latest',
          container_id: '1484832d434fasfs',
          status: 'running',
          ip: '10.5.12.26',
          environment: {},
        },
      ],
    });
  },
  'GET /api/admin/apps/:app_id/roles': (req: Request, res: Response) => {
    //res.status(401);
    res.send(
      Mock.mock({
        total: 8,
        'data|8': [
          {
            id: '@id',
            title: '@title',
            auth: { query: { name: 'mine' } },
            'enabled|1': [true, false],
          },
        ],
      }),
    );
  },
  'POST /api/admin/apps/:app_id/roles/:role_id': (
    req: Request,
    res: Response,
  ) => {
    res.send({ ...req.body, id: req.params.role_id });
  },
  'POST /api/admin/apps/:app_id/roles': (req: Request, res: Response) => {
    res.send({ ...req.body, id: new Date().getTime() + '' });
  },
  'POST /api/admin/apps/:app_id/services/:role_id': (
    req: Request,
    res: Response,
  ) => {
    res.send({ ...req.body, id: req.params.role_id });
  },
  'POST /api/admin/apps/:app_id/services': (req: Request, res: Response) => {
    res.send({ ...req.body, id: new Date().getTime() + '' });
  },
  'GET /api/admin/users': (req: Request, res: Response) => {
    res.send(
      Mock.mock({
        total: 120,
        'data|20': [
          {
            id: '@id',
            user_name: '@name',
            email: '@email',
            'enabled|1': [true, false],
          },
        ],
      }),
    );
  },
  'POST /api/admin/users/': (req: Request, res: Response) => {
    req.body.id = new Date().getTime();
    res.send(req.body);
  },
  'GET /api/admin/users/:user_id': (req: Request, res: Response) => {
    res.send({
      id: req.params.user_name,
      user_name: 'ausername',
      email: 'somebody@example.com',
      enabled: true,
      roles: [
        {
          name: 'photo',
          title: 'myphoto',
          roles: [
            { id: 11, title: 'xxxx11' },
            { id: 12, title: 'xxxx12' },
          ],
        },
        {
          name: 'others',
          title: 'myothers',
          roles: [
            { id: 23, title: 'xxxx23' },
            { id: 24, title: 'xxxx24' },
          ],
        },
      ],
    });
  },
  'POST /api/admin/users/:user_id': (req: Request, res: Response) => {
    res.send(req.body);
  },
  'GET /api/admin/appstore': (req: Request, res: Response) => {
    res.send(
      Mock.mock({
        total: 20,
        'data|20': [
          {
            id: '@id',
            name: '@name',
            title: '@title',
            description: '@title',
            services: [
              {
                name: 'main',
                image: 'main:latest',
                environment: [
                  {
                    name: 'DB_HOST',
                    value: '127.0.0.1',
                  },
                ],
              },
            ],
          },
        ],
      }),
    );
  },
};
