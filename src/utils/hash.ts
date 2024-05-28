import bcrypt from 'bcryptjs'


class HashHelper {

    makeHash(value: string): string {
        const salt: any = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(value, salt);
    }

    checkHash(givenValue: string, oldValue: string): any{
        return bcrypt.compare(givenValue, oldValue);
    }
}

export const {
    makeHash,
    checkHash
} = new HashHelper();