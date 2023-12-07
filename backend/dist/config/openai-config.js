// Function to configure and return OpenAI client options
export const configureOpenAI = () => {
    const config = ({
        // Set up configuration object with OpenAI API key and organization ID
        apiKey: process.env.OPEN_AI_SECRET, // Set OpenAI API key from environment variable
        organization: process.env.OPENAI_ORAGANIZATION_ID, // Set OpenAI organization ID from environment variable
    });
    // Return the configured OpenAI client options
    return config;
};
//# sourceMappingURL=openai-config.js.map