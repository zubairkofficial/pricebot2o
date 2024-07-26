import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Alert, ListGroup, Button, InputGroup, FormControl, Spinner } from 'react-bootstrap';
import Helpers from "../../Config/Helpers";

const SentEmails = () => {
  const [emails, setEmails] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${Helpers.apiUrl}getSentEmails`,Helpers.authHeaders);
        setEmails(response.data.emails);
        setFilteredEmails(response.data.emails);
        setIsLoading(false);
      } catch (error) {
        setError("Fehler beim Abrufen gesendeter E-Mails");
        setIsLoading(false);
      }
    };

    fetchEmails();
  }, []);

  useEffect(() => {
    const results = emails.filter(email => {
      const name = email.email ? email.email.toLowerCase() : "";
      const title = email.transcriptionText ? email.transcriptionText.toLowerCase() : "";
      return (
        name.includes(searchTerm.toLowerCase()) ||
        title.includes(searchTerm.toLowerCase())
      );
    });
    setFilteredEmails(results);
  }, [searchTerm, emails]);

  const handleEmailClick = (email) => {
    navigate(`/resend-email/${email.id}`);
  };

  return (
    <Container fluid className="p-0 min-vh-100 d-flex flex-column bg-light" style={{ overflow: 'hidden' }}>
      <Row className="flex-grow-1">
        <Col xs={2} lg={2} md={2} className="px-0">
          {/* Sidebar Component Placeholder */}
        </Col>
        <Col xs={10} lg={10} md={10}>
          <Container fluid className="pt-5">
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center flex-wrap mb-4 px-2">
                <h2 className='flex-grow-1'>Gesendete E-Mails</h2>
                <div className="d-flex flex-column flex-sm-row">
                  <InputGroup size="sm" className="mr-3 mb-2 mb-sm-0" style={{ maxWidth: '300px' }}>
                    <FormControl
                      placeholder="Nach email oder Transkriptions suchen..."
                      aria-label="Suche"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                  <Link to="/voice" className="button btn-primary ms-sm-2">Sprachassistent</Link>
                </div>
              </div>
            </div>

            <Card className="shadow bg-white rounded">
              <Card.Body>
                {isLoading ? (
                  <div className="text-center py-3">
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Laden...</span>
                    </Spinner>
                  </div>
                ) : error ? (
                  <Alert variant="danger">{error}</Alert>
                ) : (
                  <ListGroup variant="flush">
                    {filteredEmails.map((email, index) => (
                      <ListGroup.Item
                        key={index}
                        className="d-flex justify-content-between align-items-center"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleEmailClick(email)}
                      >
                        <div>
                          <div><strong>{email.title}</strong></div>
                          <div>
                            {email.transcriptionText ? `${email.transcriptionText.substring(0, 70)}${email.transcriptionText.length > 70 ? '...' : ''}` : ''}
                          </div>
                          {email.transcriptionText && email.transcriptionText.length > 70 && (
                            <div className="text-muted">Vollständige E-Mail anzeigen</div>
                          )}
                        </div>
                        <small>{email.email}</small>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </Card.Body>
            </Card>
          </Container>
        </Col>
      </Row>
    </Container>
  );

};

export default SentEmails;
