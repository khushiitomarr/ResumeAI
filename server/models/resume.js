import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  title:{
     type: String,
     required: true,
     trim: true,
  },
  name:{
     type: String,
     trim: true,
  },
  email:{
     type: String,
     trim: true,
  },
  phone:{
     type: String,
     trim: true,
  },
  linkedin:{
     type: String,
     trim: true,
  },
  summary:{
     type: String,
  },
  skills:[{
     type: String,
  },],
  template:{
     type: String,
     default: "modern",
  },
  education:[{
     degree: String,
      college: String,
      year: String,
  },],
  projects:[ {
      title: String,
      tech: String,
      description: String,
    },
  ],
   experience: [
    {
      company: String,
      role: String,
      duration: String,
      description: String,
    },
  ],

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
},
{timestamps: true},
);

const Resume = mongoose.model('Resume', resumeSchema);
export default Resume;
