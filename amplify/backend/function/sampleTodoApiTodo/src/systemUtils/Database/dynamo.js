const { execute } = require("./queryManager");

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
  const parameters = Object.values(params);

  const queryResult = await execute(SQL, parameters);

  return queryResult;
};

const createValueConditions = (valueKeys) => {
  const keys = valueKeys.map((item) => `'${item}':? `);
  const jsonKeys = `{ ${keys.join(",")} }`;
  return jsonKeys;
};

exports.insert = async (table, values) => {
  const value = createValueConditions(Object.keys(values));
  const SQL = `
  INSERT INTO
    "${table}-${ENV}"
  VALUE
      ${value}
    `;

  const params = Object.values(values);
  const queryResult = await execute(SQL, params);

  return queryResult;
};
