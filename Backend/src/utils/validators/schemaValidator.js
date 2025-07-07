const validadorSchema = async (schema, data, partial = null) => {
  if (partial) {
    return schema.partial(partial).safeParse(data);
  }
  return schema.safeParse(data);
};

export default validadorSchema;
