import React, { useState } from "react";
import PageLayout from "../../layouts/PageLayout";
import { Col, Row } from "react-bootstrap";
import { Box } from "../../components/elements";

import { Tabs, Tab } from "react-bootstrap";

import ConDishDetailsTab from "../../components/Tabs/ConDishDetailsTab";
import ConDishEmenuTaab from "../../components/Tabs/ConDishEmenuTab";
import ConDishModifier from "../../components/Tabs/ConDishModifier";
import ConDishRecipeTab from "../../components/Tabs/ConDishRecipeTab";
import { Link } from "react-router-dom";

export default function ConstructureDish() {
  const [key, setKey] = useState("tab1");

  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
              <Row>
                <Col md={12}>
                  <Box className="construction-edit">
                    <Box className="construction-edit-h5">
                      <h5>{`Create (Dish -- Expresso)`}</h5>
                    </Box>
                    <Box className="construction-edit-icons">
                      <Box className="edit-icons">
                        <Link to="/constructure" className="addproduct-btn ">
                          <img
                            className="fas fa-user"
                            src="/images/icons/check.png"
                            alt="Save"
                          />
                        </Link>

                        <Link to="/constructure" className="addproduct-btn ">
                          <img
                            className="fas fa-user"
                            src="/images/icons/close1.png"
                            alt="Close"
                          />
                        </Link>
                      </Box>
                    </Box>
                  </Box>
                </Col>
              </Row>
          </Col>
          <Col md={12}>
              <Tabs id="my-tabs" activeKey={key} onSelect={(k) => setKey(k)}>
                <Tab eventKey="tab1" title="Details">
                  <div className="tabContent additiona-infoTab">
                    <ConDishDetailsTab />
                  </div>
                </Tab>

                <Tab eventKey="tab2" title="Recipe">
                  <div className="tabContent additiona-infoTab">
                    <ConDishRecipeTab />
                  </div>
                </Tab>
                <Tab eventKey="tab3" title="Modifier">
                  <div className="tabContent additiona-infoTab">
                    <ConDishModifier />
                  </div>
                </Tab>
                <Tab eventKey="tab4" title="eMenu">
                  <div className="tabContent additiona-infoTab">
                    <ConDishEmenuTaab />
                  </div>
                </Tab>
              </Tabs>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
