// import React,{useState} from 'react'
// import { CCard, CCardBody, CCardHeader, CCol, CProgress, CProgressBar, CRow } from '@coreui/react'
// import { DocsExample } from '../../../components'
// import { Container,Grid,Typography,TextField } from '@mui/material'
// import { Input as BaseInput } from '@mui/base/Input';
// import { TextareaAutosize } from '@mui/base/TextareaAutosize';
// import { experimentalStyled as styled } from '@mui/material/styles';


// const Input = React.forwardRef(function CustomInput(props, ref) {
//   return (
//     <BaseInput
//       slots={{
        
//         root: RootDiv,
//         input: 'input',
//         textarea: TextareaElement,
//       }}
//       {...props}
//       ref={ref}
//     />
//   );
// });

// const RootDiv = styled('div')`
//   display: flex;
//   max-width: 100%;
// `;

// const TextareaElement = styled(TextareaAutosize)(
//   ({ theme }) => `
//   width:600px;
//   font-family: Anton, sans-serif;
// font-style: italic;
//   font-size: 0.875rem;
  
//   line-height: 1.5rem;
//   padding: 8px 12px;
//   border-radius: 2px;
//   color: ${theme.palette.mode === 'dark' ? '#2d2859' : "#2d2859"};
//   background: ${theme.palette.mode === 'dark' ? '#fff' : "#fff"};
//   border: 1px solid ${theme.palette.mode === 'dark' ? '#818283' : "#818283"};
//   box-shadow: 0px 2px 4px ${
//     theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
//   };
//   &:hover {
//     border-color: #2d2859;
//   }

//   &:focus {
//     border-color: #2d2859;
//     box-shadow: 0 0 0 3px #fff;
//   } `,
// );

// const Progress = () => {

//   const [name,setName]= useState('')
// const [email,setEmail]= useState('')
// const [number,setNumber]= useState('')
// const [message,setMessage]= useState('')

//   return (
//     <Container>
//        <Grid xs={5} container  direction="column"  justifyContent="center"  alignItems="flex-start">
//           <Typography id="form-head" >
//                <b>Send Us a Message </b>
//            </Typography>
//            <Typography id="form-text" >
//                <b>Give us chance to serve and bring magic to your brand</b>
//            </Typography>
//            <Grid mt={4}  container direction="row" justifyContent="space-between" alignItems="center">
//            <Grid >
//            <Typography id="input-text" className='mb-2' >
//                Fullname
//            </Typography>
//            <TextField
//       id="outlined-basic"
      
//       value={name}
//       sx={{
//         "& .MuiOutlinedInput-input": {
//           color: "#000",
//           height: 5,
//         },
//         "& .MuiOutlinedInput-root": {
//           "&.Mui-focused fieldset": {
//             borderColor: name ? "#2d2859" : "#2d2859", // Change border color based on value
//           },
//           backgroundColor: name ? "#f0f0f0" : "#fff", // Change background color based on value
//         },
//       }}
//       variant="outlined"
//       onChange={(e) => { setName(e.target.value); }}
//     />
//            </Grid>
//     <Grid>
//     <Typography className='mb-2' id="input-text">
//               Email
//            </Typography>
//            <TextField
//       id="outlined-basic"
      
//       value={email}
//       sx={{
//         "& .MuiOutlinedInput-input": {
//           color: "#000",
//           height: 5,
//         },
//         "& .MuiOutlinedInput-root": {
//           "&.Mui-focused fieldset": {
//             borderColor: email ? "#2d2859" : "#2d2859", // Change border color based on value
//           },
//           backgroundColor: email ? "#f0f0f0" : "#fff", // Change background color based on value
//         },
//       }}
//       variant="outlined"
//       onChange={(e) => { setEmail(e.target.value); }}
//     />
//     </Grid>
//            </Grid>
//            <Grid xs={12} mt={2} container direction="row" justifyContent="flex-start"  alignItems="center">
//            <Typography className='mb-2' id="input-text">
//              Phone number
//            </Typography>
//            <TextField
//       id="outlined-basic"
//       fullWidth
//       value={number}
//       sx={{
//         "& .MuiOutlinedInput-input": {
//           color: "#000",
//           height: 5,
//         },
//         "& .MuiOutlinedInput-root": {
//           "&.Mui-focused fieldset": {
//             borderColor: number ? "#2d2859" : "#2d2859", // Change border color based on value
//           },
//           backgroundColor: number ? "#f0f0f0" : "#fff", // Change background color based on value
//         },
//       }}
//       variant="outlined"
//       onChange={(e) => { setNumber(e.target.value); }}
//     />
//            </Grid>
//            <Grid xs={12} mt={2} container direction="column" justifyContent="flex-start" alignItems="flex-start">
//            <Typography className='mb-2' id="input-text">
//              Message
//            </Typography>
//            <Input aria-label="Demo input" value={message} onChange={(e) => { setMessage(e.target.value); }} multiline placeholder="May I Help You" />
//            </Grid>
//            </Grid>
//     </Container>
//   )
// }

// export default Progress
import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormSelect,
  CButton,
  CAlert,
  CSpinner,
  CCol,
  CRow,
  CFormCheck,
  CInputGroup,
  CInputGroupText,
  CFormTextarea,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CBadge
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilBell, cilSend, cilUser, cilCalendar, cilTag } from '@coreui/icons';

const NotificationForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    audience: 'all', // 'all', 'selected', or 'group'
    selectedUsers: [],
    userGroup: '',
    schedule: false,
    scheduledTime: '',
    priority: 'normal' // 'low', 'normal', 'high'
  });

  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch users
        const usersResponse = await fetch('/api/users');
        if (!usersResponse.ok) throw new Error('Failed to fetch users');
        const usersData = await usersResponse.json();
        setUsers(usersData.users || []);

        // Fetch groups
        const groupsResponse = await fetch('/api/user-groups');
        if (!groupsResponse.ok) throw new Error('Failed to fetch groups');
        const groupsData = await groupsResponse.json();
        setGroups(groupsData.groups || []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error fetching data, please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleUserSelection = (userId) => {
    setFormData(prev => {
      const selected = [...prev.selectedUsers];
      const index = selected.indexOf(userId);
      
      if (index > -1) {
        selected.splice(index, 1);
      } else {
        selected.push(userId);
      }
      
      return { ...prev, selectedUsers: selected };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, body, audience, selectedUsers, userGroup, schedule, scheduledTime, priority } = formData;

    if (!title || !body) {
      setError('Title and message are required');
      return;
    }

    if (audience === 'selected' && selectedUsers.length === 0) {
      setError('Please select at least one user');
      return;
    }

    if (audience === 'group' && !userGroup) {
      setError('Please select a group');
      return;
    }

    if (schedule && !scheduledTime) {
      setError('Please select a scheduled time');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const payload = {
        title,
        body,
        audience,
        priority,
        ...(audience === 'selected' && { userIds: selectedUsers }),
        ...(audience === 'group' && { groupId: userGroup }),
        ...(schedule && { scheduledTime })
      };

      const response = await fetch('/api/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error sending notification');
      }

      setSuccess('Notification sent successfully!');
      setFormData({
        title: '',
        body: '',
        audience: 'all',
        selectedUsers: [],
        userGroup: '',
        schedule: false,
        scheduledTime: '',
        priority: 'normal'
      });
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'An error occurred while sending the notification.');
    } finally {
      setLoading(false);
    }
  };

  const getPriorityBadge = (priority) => {
    const variants = {
      low: 'info',
      normal: 'primary',
      high: 'danger'
    };
    return variants[priority] || 'primary';
  };

  return (
    <CCard className="mb-4">
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <CIcon icon={cilBell} className="me-2" />
          Send Notification
        </h5>
        <CBadge color={getPriorityBadge(formData.priority)}>
          Priority: {formData.priority}
        </CBadge>
      </CCardHeader>
      <CCardBody>
        {error && <CAlert color="danger" dismissible onClose={() => setError('')}>{error}</CAlert>}
        {success && <CAlert color="success" dismissible onClose={() => setSuccess('')}>{success}</CAlert>}

        <CForm onSubmit={handleSubmit}>
          <CRow className="mb-3">
            <CCol md={8}>
              <CInputGroup>
                <CInputGroupText>
                  <CIcon icon={cilTag} />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Notification Title"
                  required
                />
              </CInputGroup>
            </CCol>
            <CCol md={4}>
              <CFormSelect
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="low">Low Priority</option>
                <option value="normal">Normal Priority</option>
                <option value="high">High Priority</option>
              </CFormSelect>
            </CCol>
          </CRow>

          <div className="mb-3">
            <CFormTextarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              placeholder="Write your notification message here..."
              rows={5}
              required
            />
          </div>

          <CAccordion activeItem={isExpanded ? 0 : -1}>
            <CAccordionItem itemKey={0}>
              <CAccordionHeader onClick={() => setIsExpanded(!isExpanded)}>
                <CIcon icon={cilUser} className="me-2" />
                Audience & Scheduling Options
              </CAccordionHeader>
              <CAccordionBody>
                <div className="mb-3">
                  <label className="form-label">Audience</label>
                  <div className="d-flex gap-3">
                    <CFormCheck
                      type="radio"
                      name="audience"
                      id="audience-all"
                      value="all"
                      checked={formData.audience === 'all'}
                      onChange={handleChange}
                      label="All Users"
                    />
                    <CFormCheck
                      type="radio"
                      name="audience"
                      id="audience-selected"
                      value="selected"
                      checked={formData.audience === 'selected'}
                      onChange={handleChange}
                      label="Selected Users"
                    />
                    <CFormCheck
                      type="radio"
                      name="audience"
                      id="audience-group"
                      value="group"
                      checked={formData.audience === 'group'}
                      onChange={handleChange}
                      label="User Group"
                    />
                  </div>
                </div>

                {formData.audience === 'selected' && (
                  <div className="mb-3">
                    <label className="form-label">Select Users</label>
                    <div className="border p-3 rounded" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                      {users.map(user => (
                        <CFormCheck
                          key={user.id}
                          type="checkbox"
                          id={`user-${user.id}`}
                          label={`${user.name} (${user.email})`}
                          checked={formData.selectedUsers.includes(user.id)}
                          onChange={() => handleUserSelection(user.id)}
                          className="mb-2"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {formData.audience === 'group' && (
                  <div className="mb-3">
                    <label className="form-label">Select Group</label>
                    <CFormSelect
                      name="userGroup"
                      value={formData.userGroup}
                      onChange={handleChange}
                    >
                      <option value="">Select a group</option>
                      {groups.map(group => (
                        <option key={group.id} value={group.id}>{group.name}</option>
                      ))}
                    </CFormSelect>
                  </div>
                )}

                <div className="mb-3">
                  <CFormCheck
                    type="checkbox"
                    name="schedule"
                    id="schedule-notification"
                    label="Schedule this notification"
                    checked={formData.schedule}
                    onChange={handleChange}
                  />
                </div>

                {formData.schedule && (
                  <div className="mb-3">
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilCalendar} />
                      </CInputGroupText>
                      <CFormInput
                        type="datetime-local"
                        name="scheduledTime"
                        value={formData.scheduledTime}
                        onChange={handleChange}
                        min={new Date().toISOString().slice(0, 16)}
                      />
                    </CInputGroup>
                  </div>
                )}
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>

          <div className="d-flex justify-content-end mt-4">
            <CButton 
              type="submit" 
              color="primary" 
              disabled={loading}
              className="d-flex align-items-center"
            >
              {loading ? (
                <>
                  <CSpinner size="sm" className="me-2" /> Sending...
                </>
              ) : (
                <>
                  <CIcon icon={cilSend} className="me-2" />
                  Send Notification
                </>
              )}
            </CButton>
          </div>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default NotificationForm;