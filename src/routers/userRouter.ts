import passport from 'passport';
import { Request, Response, Express } from 'express';

export = (server: Express) => {
    server.get('/api/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email'],
        })
    );

    server.get(
        '/api/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/' }),
        (req: Request, res: Response) => {
            if (req.headers.referer === 'http://localhost:3000' || req.headers.host === 'localhost:3000') {
                res.redirect('/categories');
            } else {
                res.redirect('/api/categories');
            }
        }
    );

    server.get('/api/logout', (req: Request, res: Response) => {
        req.logOut();
        if (req.headers.referer == 'http://localhost:3000' || req.headers.host === 'localhost:3000') {
            res.redirect('/');
        } else {
            res.redirect('/api/');
        }
    });

    server.get('/api/current_user', (req: Request, res: Response) => {
        // if (!req.user) {
        //     const redirectUrl = 'http://localhost:3000/';
        //     res.redirect(redirectUrl);
        // }
        // else
            res.send(req.user);
    });
};
