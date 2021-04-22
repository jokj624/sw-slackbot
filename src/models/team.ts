import mongoose, { Schema } from 'mongoose';

const TeamSchema = new Schema({
    team_id: {
        type: String
    },
    access_token: {
        type: String
    }
});

const Team = mongoose.model<mongoose.Document>('Team', TeamSchema);
export default Team;