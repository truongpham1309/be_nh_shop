import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

roleSchema.statics.seedRoles = async function () {
  const count = await this.countDocuments();
  if (count === 0) {
    await this.insertMany([
      { name: 'Admin' },
      { name: 'Client' },
    ]);
    console.log('🚀 Seeded default roles: Admin, Client');
  }
};

const Role = mongoose.model('Role', roleSchema);

Role.seedRoles().catch(err => console.error('❌ Role seeding error:', err));

export default Role;
