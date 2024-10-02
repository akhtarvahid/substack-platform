// import ormconfig from '@app/ormconfig';

import ormconfig from "./ormconfig";

const ormseedconfig = {
    ...ormconfig,
    migrations: ['src/seeds/*.ts']
}

export default ormseedconfig;