// Initialisation
xrequire('./plugins/scripts/globals');
xrequire('./plugins/scripts/coreEvents');
xrequire('./plugins/scripts/defaults');

// Vulcan init structures (via index.js)
xrequire('./handlers/prototypeLoadHandler')();
xrequire('./handlers/extensionLoadHandler')();

// Required modules
const fs     = xrequire('fs');
const yaml   = xrequire('js-yaml');
const Vulcan = xrequire('./structures/classes/core/Vulcan');
const logger = xrequire('./managers/LogManager').getInstance();

// Load settings & configuration data
const defaultFiles      = global.VulcanDefaults.files;
const configurationFile = fs.readFileSync(defaultFiles.configuration.location, 'utf8');
const credentialsFile   = fs.readFileSync(defaultFiles.credentials.location, 'utf8');
const permissionsFile   = fs.readFileSync(defaultFiles.permissions.location, 'utf8');
const configuration     = yaml.safeLoad(configurationFile);
const credentials       = yaml.safeLoad(credentialsFile);
const permissions       = yaml.safeLoad(permissionsFile);

// Instantiate & export vulcan client
const vulcan = module.exports = new Vulcan(
    // Vulcan Options
    {
        configuration,
        credentials,
        permissions
    },
    // Discord.js Options
    {
        disabledEvents: [
            'USER_NOTE_UPDATE',
            'TYPING_START',
            'RELATIONSHIP_ADD',
            'RELATIONSHIP_REMOVE'
        ],
        disableEveryone    : true,
        messageCacheMaxSize: 1000
    }
);

// Vulcan (do NOT chain of instantiation)*/
vulcan
    .loadDatabase()
    .loadCommands()
    .loadEvents()
    .loadPermissions()
    .loadCLI()
    .connect(); // [must be last or omitted]

// Log
logger.log(`Vulcan start-up has completed! Time taken: ${vulcan.loadTime}seconds`);

// Load Complete Flag
global.__loaded = true;
