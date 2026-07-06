const createResume = async (req, res) => {
  try {
    const { title, summary, skills, education, projects, experience } =
      req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const resume = await Resume.create({
      title,
      summary,
      skills,
      education,
      projects,
      experience,
      user: req.user.id,
    });
    return res.status(201).json({
      success: true,
      message: "Resume created successfully",
      resume,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      resumes,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    return res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateResume = async (req, res) => {
  try {
    const { title, summary, skills, education, projects, experience } =
      req.body;

       if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const updatedResume = await Resume.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      {
        title,
        summary,
        skills,
        education,
        projects,
        experience,
      },
      {
        new: true,
      },
    );

    if (!updatedResume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Resume updated successfully",
      resume: updatedResume,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteResume = async (req, res) => {
  try{
    const deletedResume = await Resume.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    })
    if (!deletedResume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Resume deleted successfully'
    });
  } catch(error ){
    console.error(error);
return res.status(500).json({
      success: false,
      message: "Internal Server Error",
})
  }
}