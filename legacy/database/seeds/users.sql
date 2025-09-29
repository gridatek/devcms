-- Sample users for development
-- Note: Passwords are hashed with bcrypt

INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'admin@devcms.com', '$2b$10$rQ8GzjB.1A2.3B4C5D6E7F8G9H0I1J2K3L4M5N6O7P8Q9R0S1T2U3V', NOW(), NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440002', 'editor@devcms.com', '$2b$10$rQ8GzjB.1A2.3B4C5D6E7F8G9H0I1J2K3L4M5N6O7P8Q9R0S1T2U3V', NOW(), NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440003', 'author@devcms.com', '$2b$10$rQ8GzjB.1A2.3B4C5D6E7F8G9H0I1J2K3L4M5N6O7P8Q9R0S1T2U3V', NOW(), NOW(), NOW());

INSERT INTO profiles (id, email, full_name, role, avatar_url, bio, is_active) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'admin@devcms.com', 'Admin User', 'admin', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', 'System administrator with full access to all features.', true),
  ('550e8400-e29b-41d4-a716-446655440002', 'editor@devcms.com', 'Jane Editor', 'editor', 'https://images.unsplash.com/photo-1494790108755-2616b612b988?w=400', 'Content editor responsible for reviewing and publishing content.', true),
  ('550e8400-e29b-41d4-a716-446655440003', 'author@devcms.com', 'John Author', 'author', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', 'Content author focusing on technical blog posts and tutorials.', true);