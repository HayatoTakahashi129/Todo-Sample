const { execute } = require("./queryManager");
const {
  createConditionParams,
  reshapeResult,
} = require("./interfaceConverter");

const ENV = process.env.ENV;

const createWhereCondition = (params) => {
  const keyList = Object.keys(params);
  const statement = keyList.map((item) => `${item} = ? `).join("AND\n");

  return statement;
};

const createSelect = (select) => {
  const statement = select.map((item) => `"${item}"`).join(",\n");
  return statement;
};

exports.selectDB = async (table, select, params) => {
  const whereStatement = createWhereCondition(params);
  const selectStatement = createSelect(select);
  const SQL = `
    SELECT 
        ${selectStatement}
    FROM
        "${table}-${ENV}"
    WHERE
        ${whereStatement}
    ;
  `;

  // I couldn't find the way to convert by library option.
  const parameters = createConditionParams(params);

  const queryResult = await execute(SQL, parameters);
  const result = reshapeResult(queryResult);

  return result;
};
