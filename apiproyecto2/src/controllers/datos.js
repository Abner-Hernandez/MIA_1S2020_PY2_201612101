const dao = require("../dbo/dao");


module.exports = {
    
    information: async (req,res,next) =>{
        sql = "select * from page_data";
        dao.open(sql,[],false,res);
    },
    uDatos: async (req,res,next) =>{
        sql = "update page_data set page_name = :page_name, page_slogan = :page_slogan, page_logo = :page_logo, page_video = :page_video, page_mission = :page_mission, page_vision = :page_vision, page_about = :page_about";
        const page_name = req.body.NOMBRE;
        const page_slogan = req.body.ESLOGAN;
        const page_logo = req.body.LOGO;
        const page_video = req.body.VIDEO;
        const page_mission = req.body.MISION;
        const page_vision = req.body.VISION;
        const page_about = req.body.ABOUT_ME;
        dao.open(sql,[page_name, page_slogan, page_logo, page_video, page_mission, page_vision, page_about],true,res);
    },
    uNombre: async (req,res,next) =>{
        sql = "update page_data set page_name = :page_name";
        const page_name = req.body.PAGE_NAME;
        dao.open(sql,[page_name],true,res);
    },
    uSlogan: async (req,res,next) =>{
        sql = "update page_data set page_slogan = :page_slogan";
        const page_slogan = req.body.PAGE_SLOGAN;
        dao.open(sql,[page_slogan],true,res);
    },
    uLogo: async (req,res,next) =>{
        sql = "update page_data set page_logo = :page_logo";
        const page_logo = req.body.PAGE_LOGO;
        console.log(req.body);
        dao.open(sql,[page_logo],true,res);
    },
    uVideo: async (req,res,next) =>{
        sql = "update page_data set page_video = :page_video";
        const page_video = req.body.PAGE_VIDEO;
        dao.open(sql,[page_video],true,res);
    },
    uMision: async (req,res,next) =>{
        sql = "update page_data set page_mission = :page_mission";
        const page_mission = req.body.PAGE_MISSION;
        dao.open(sql,[page_mission],true,res);
    },
    uVision: async (req,res,next) =>{
        sql = "update page_data set page_vision = :page_vision";
        const page_vision = req.body.PAGE_VISION;
        dao.open(sql,[page_vision],true,res);
    },
    uAbout: async (req,res,next) =>{
        sql = "update page_data set page_about = :page_about";
        const page_about = req.body.PAGE_ABOUT;
        dao.open(sql,[page_about],true,res);
    }
};