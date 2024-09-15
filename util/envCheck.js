export class Check {
  static verifyEnvironment() {
    const missingVariables = [];

    if (!process.env.PORT) missingVariables.push("PORT");
    if (!process.env.DB_CONNECTION_URL)
      missingVariables.push("DB_CONNECTION_URL");
    if (!process.env.secretKey) missingVariables.push("secretKey");

    if (missingVariables.length > 0) {
      console.error(
        `Missing environment variables: ${missingVariables.join(", ")}`,
      );
      return false;
    }
    return true;
  }
}
