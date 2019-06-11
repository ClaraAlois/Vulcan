const fs   = xrequire('fs');
const path = xrequire('path');
const yaml = xrequire('js-yaml');

const printPrefix  = '[DEFAULTS]';
const rootPath     = __basedir;
const parsingTypes = {
    // eslint-disable-next-line indent
    COMPLEX: 1,
    SIMPLE: 2
};

let DefaultFile = function (location, data) {
    this.location = location;
    this.data = data
}

let log = (...args) => {
    console.log(printPrefix, ...args);
}

let writeToDefaultFile = (object, path) => {
    let data = yaml.safeDump(object);

    fs.writeFileSync(path, data, function (err) {
        if (err) throw err;
    });
}

global.ParsingTypes = parsingTypes;
global.Defaults = {
    folders: ['settings', 'data'],
    files: {
        'configuration': new DefaultFile(
            path.join(rootPath, 'settings', 'config.yaml'), {
                prefixes: ['!', '>'],
                devsID: ['166176374036365312', '207606117159796737'], // Please don't change this
                parsingType: [parsingTypes.SIMPLE]
            }
        ),
        'privatedata': new DefaultFile(
            path.join(rootPath, 'settings', 'noleakdata.yaml'), {
                token: `'PLEASE ADD YOUR DISCORD TOKEN HERE'`,
                githubAuth: {
                    username: 'GitPaulo',
                    password: 'KONO DIO DA'
                }
            }
        ),
        'dbcredentials': new DefaultFile(
            path.join(rootPath, 'settings', 'dbcredentials.yaml'), {
                username: 'ur_mom_gay',
                password: 'no_u'
            }
        ),
        // Commands will have 3 groups. Group 1 only roots can use. Group 2 only admin and above can use. Group 3 everyone can use. Everyone not in this file is a pleb by default.
        'user_permissions': new DefaultFile(
            path.join(ROOT_PATH, 'settings', 'user_permissions.yaml'), {
                roots: ['166176374036365312', '207606117159796737'],
                admins: []
            }
        )
    }
};

// Check for missing settings files and root properties & write defaults.
(function () {
    for (let folderName of Defaults.folders) {
        let folderPath = path.join(__basedir, folderName);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
    }

    for (let fileKey in Defaults.files) {
        let defaultObject = Defaults.files[fileKey];
        let filePath      = defaultObject.location;
        let folderName    = path.dirname(filePath).split(path.sep).pop();

        // Check folder
        if (!Defaults.folders.includes(folderName)) {
            throw new Error('Default folders are not valid!');
        }

        // Check files
        if (!fs.existsSync(filePath)) {
            log(`Default file: ${filePath} is missing. Writing defaults.`);
            writeToDefaultFile(defaultObject.data, filePath);
        } else { // check if contents are proper
            let defaultFile       = fs.readFileSync(filePath, 'utf8');
            let parsedObject      = yaml.safeLoad(defaultFile);
            let missingProperties = Object.keys(defaultObject.data).filter(x => !Object.keys(parsedObject).includes(x));

            if (missingProperties.length > 0) {
                for (let rootProperty of missingProperties) {
                    parsedObject[rootProperty] = defaultObject.data[rootProperty];
                }

                log(`Root property(s) missing: ${missingProperties.toString()}, writing defaults for file in ${filePath}.`);
                writeToDefaultFile(parsedObject, filePath);
            }
        }
    }
})();
