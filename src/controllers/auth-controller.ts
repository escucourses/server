// Libraries
import { Request, Response } from 'express';
import { body, ValidationChain } from 'express-validator';
import * as jwt from 'jsonwebtoken';

// Constants
import { environment } from '../config/environment';

// Errors
import { BadRequestError } from '../errors/bad-request-error';

// Models
import { User } from '../models/user';

export class AuthController {
  public signupValidations: ValidationChain[];

  constructor() {
    this.signupValidations = [
      body('first_name')
        .isLength({ min: 2 })
        .withMessage('First name must have a minimum of 2 characters'),
      body('last_name')
        .isLength({ min: 2 })
        .withMessage('Last name must have a minimum of 2 characters'),
      body('birthday')
        .isISO8601()
        .toDate()
        .withMessage('Date must be valid (YYYY-MM-DD)'),
      body('email')
        .normalizeEmail()
        .isEmail()
        .withMessage('Email must be valid'),
      body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters'),
    ];
  }

  public async signup(req: Request, res: Response, next): Promise<Response> {
    const {
      first_name: firstName,
      last_name: lastName,
      birthday,
      email,
      password,
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const user = new User();

    user.firstName = firstName;
    user.lastName = lastName;
    user.birthday = birthday;
    user.email = email;
    user.password = password;

    await user.save();
    delete user.password;

    user.token = jwt.sign(
      { id: user.id, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
      environment.jwtSecret
    );

    return res.status(201).send(user);
  }
}
