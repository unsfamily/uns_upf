# API Testing Guide

## Testing with cURL

### 1. Health Check

```bash
curl http://localhost:5000/api/health
```

Expected response:

```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### 2. Submit Pledge

```bash
curl -X POST http://localhost:5000/api/pledge \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "country": "India",
    "signature": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
  }'
```

Expected response:

```json
{
  "success": true,
  "message": "Thank you for pledging for Global Peace!",
  "pledgeId": 1
}
```

### 3. Get All Pledges

```bash
curl http://localhost:5000/api/pledges
```

### 4. Get Pledge Count

```bash
curl http://localhost:5000/api/pledges/count
```

Expected response:

```json
{
  "success": true,
  "count": 1
}
```

### 5. Get Pledge by ID

```bash
curl http://localhost:5000/api/pledge/1
```

Expected response:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "country": "India",
    "created_at": "2025-10-27T12:00:00.000Z"
  }
}
```

## Testing with Postman

### Import Collection

Create a new Postman collection with the following requests:

#### 1. Health Check

- Method: `GET`
- URL: `http://localhost:5000/api/health`

#### 2. Submit Pledge

- Method: `POST`
- URL: `http://localhost:5000/api/pledge`
- Headers: `Content-Type: application/json`
- Body (raw JSON):

```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@example.com",
  "country": "United States",
  "signature": "data:image/png;base64,..."
}
```

#### 3. Get All Pledges

- Method: `GET`
- URL: `http://localhost:5000/api/pledges`

#### 4. Get Pledge Count

- Method: `GET`
- URL: `http://localhost:5000/api/pledges/count`

#### 5. Get Pledge by ID

- Method: `GET`
- URL: `http://localhost:5000/api/pledge/{{pledgeId}}`
- Variables: `pledgeId = 1`

## Error Cases to Test

### 1. Missing Required Fields

```bash
curl -X POST http://localhost:5000/api/pledge \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John"
  }'
```

Expected: 400 Bad Request with validation errors

### 2. Invalid Email

```bash
curl -X POST http://localhost:5000/api/pledge \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "invalid-email",
    "country": "India",
    "signature": "data:image/png;base64,..."
  }'
```

Expected: 400 Bad Request

### 3. Duplicate Email

Submit the same email twice.

Expected: 400 Bad Request with message about duplicate email

### 4. Non-existent Pledge

```bash
curl http://localhost:5000/api/pledge/99999
```

Expected: 404 Not Found

## Database Verification

After submitting a pledge, verify in MySQL:

```sql
USE peace_pledge;

-- View all pledges
SELECT * FROM pledges;

-- Count pledges
SELECT COUNT(*) FROM pledges;

-- Get pledges by country
SELECT country, COUNT(*) as count
FROM pledges
GROUP BY country
ORDER BY count DESC;

-- Get recent pledges
SELECT first_name, last_name, email, country, created_at
FROM pledges
ORDER BY created_at DESC
LIMIT 10;
```

## Frontend Testing

### Manual Testing Steps

1. **Navigation**

   - [ ] All nav links scroll smoothly
   - [ ] Header stays sticky on scroll

2. **Hero Section**

   - [ ] Images load correctly
   - [ ] CTA button works
   - [ ] Animations play

3. **About Section**

   - [ ] Gurumahan image loads
   - [ ] Text is readable
   - [ ] Layout is responsive

4. **Milestones**

   - [ ] All milestones display
   - [ ] Timeline is visible
   - [ ] Responsive grid works

5. **Pledge Form**

   - [ ] All fields are present
   - [ ] Country dropdown works
   - [ ] Signature pad functions
   - [ ] Draw signature works
   - [ ] Upload signature works
   - [ ] Clear button works
   - [ ] Validation messages show
   - [ ] Form submits successfully

6. **Certificate**

   - [ ] Preview updates with name
   - [ ] PDF download works
   - [ ] Image download works
   - [ ] Certificate is correctly formatted

7. **Responsive Design**
   - [ ] Test on mobile (< 768px)
   - [ ] Test on tablet (768px - 1024px)
   - [ ] Test on desktop (> 1024px)

## Performance Testing

### Check Loading Times

- Initial page load: < 3 seconds
- API response time: < 500ms
- Certificate generation: < 2 seconds

### Check Bundle Sizes

```bash
cd frontend
npm run build
```

Check the build output for bundle sizes.

## Browser Compatibility

Test on:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Troubleshooting

### Backend not connecting

- Check if MySQL is running
- Verify `.env` credentials
- Check port 5000 is not in use

### Frontend not connecting to backend

- Verify backend is running
- Check proxy setting in `package.json`
- Check CORS configuration

### Certificate not generating

- Check browser console for errors
- Verify jsPDF and html2canvas are loaded
- Check image URLs are accessible

## Automated Testing (Future)

Consider adding:

- Jest for unit tests
- React Testing Library for component tests
- Supertest for API endpoint tests
- Cypress or Selenium for E2E tests
