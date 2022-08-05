const loadConfigurations = () => {
  
  const mysql = {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    /**
     * 表字段修改
     * 正式环境建议修改为false
     */
    synchronize: true,
    autoLoadEntities: true
    // 下面这个实体用上面的autoLoadEntities取缔
    // entities: [process.env.DB_ENTITIES],
    
  };
  
  const redis = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  };
  
  return { mysql, redis };
  
};

export default loadConfigurations;