// Libraries
import { Request, Response } from 'express';
import { body, ValidationChain } from 'express-validator';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

// Constants
import { environment } from '../config/environment';

// Errors
import { BadRequestError } from '../errors/bad-request-error';
import { ModelNotFoundError } from '../errors/model-not-found-error';

// Models
import { User } from '../models/user';

export class AuthController {
  public signupValidations: ValidationChain[];
  public signinValidations: ValidationChain[];

  constructor() {
    this.signupValidations = [
      body('firstName')
        .isLength({ min: 2 })
        .withMessage('First name must have a minimum of 2 characters'),
      body('lastName')
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

    this.signinValidations = [
      body('email')
        .normalizeEmail()
        .isEmail()
        .withMessage('Email must be valid'),
      body('password')
        .trim()
        .notEmpty()
        .withMessage('You must supply a password'),
    ];
  }

  /**
   * Handle the User creation (signup)
   *
   * @param { Request } req
   * @param { Response } res
   *
   * @return { Promise<Response> }
   */
  public async signup(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const user = new User();

    user.setPropertiesFromObject(req.body);

    await user.save();
    delete user.password;

    user.token = this.generateAuthenticationToken(user.id);

    return res.status(201).send(user);
  }

  /**
   * Handle the User authentication (signin)
   *
   * @param { Request } req
   * @param { Response } res
   *
   * @return { Promise<Response> }
   */
  public async signin(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    let user: User;

    try {
      user = await User.findOneOrFail({ email });
    } catch (error) {
      throw new ModelNotFoundError({
        message: "The given credentials doesn't match our records",
        file: 'AUTH-CONTROLLER.SIGNIN',
      });
    }

    const arePasswordsEqual = await bcrypt.compare(password, user.password);

    if (!arePasswordsEqual) {
      throw new ModelNotFoundError({
        message: "The given credentials doesn't match our records",
        file: 'AUTH-CONTROLLER.SIGNIN',
      });
    }

    delete user.password;

    user.token = this.generateAuthenticationToken(user.id);

    return res.send(user);
  }

  /**
   * Generates an Authentication Token
   *
   * @param { number } userId
   *
   * @return { string }
   */
  generateAuthenticationToken(userId: number): string {
    return jwt.sign(
      { id: userId, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
      environment.jwtSecret
    );
  }
}
