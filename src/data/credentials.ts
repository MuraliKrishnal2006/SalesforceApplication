/**
 * Salesforce test credentials — read from environment variables.
 *
 * Local development:
 * Values are stored in the .env file.
 * The .env file is gitignored and should never be committed.
 *
 * CI:
 * Values can be provided through CI environment variables or secrets.
 */

function requireEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(
            `Missing required environment variable: ${name}. ` +
            `Please set it in the .env file or CI environment.`
        );
    }

    return value;
}

export const validUser = {
    username: requireEnv('SALESFORCE_USERNAME'),
    password: requireEnv('SALESFORCE_PASSWORD')
};

export const invalidUser = {
    username: requireEnv('SALESFORCE_INVALID_USERNAME'),
    password: requireEnv('SALESFORCE_INVALID_PASSWORD')
};

export const invalidErrorMessage = 'Invalid credentials';

export const dashboardHeader = 'Dashboard';