import { PasswordHelper } from '../../helpers/PasswordHelper';

export class PasswordHooks {

    /**
     * Hash password before create hook
     * @param model
     */
    static beforeCreate(model) {
        if (model.password) {
            model.salt = PasswordHelper.generateSalt();
            model.password = PasswordHelper.hash(model.password + model.salt);
        }
    }

    /**
     * Hash password and generate before update hook
     * @param model
     */
    static beforeUpdate(model) {
        if (model.password && model.changed('password')) {
            model.salt = PasswordHelper.generateSalt();
            model.password = PasswordHelper.hash(model.password + model.salt);
        }
    }
}
