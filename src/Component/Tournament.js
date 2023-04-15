import "./Antt.css";
import "./App.css";
import { Button, Table, Modal, Input } from "antd";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Tournament() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isViewing, setIsViewing] = useState(false);
  const [viewingStudent, setViewingStudent] = useState(null);

  const [isEditingParticipant, setIsEditingParticipant] = useState(false);
  const [editingParticipant, setEditingParticipant] = useState(null);
  const [isViewingParticipant, setIsViewingParticipant] = useState(false);
  const [viewingParticipant, setViewingParticipant] = useState(null);
  
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: "Fragster League",
      duration: "13/03 - 20/03",
      team:"FaZeClan,Rooster",
      statuss:"Active",
    },
    {
      id: 2,
      name: "IEM Rio Major",
      duration: "14/03 - 21/03",
      team:"Enze,Force",
      statuss:"Active",
    },
    {
      id: 3,
      name: "ESL One Stockholm Major",
      duration: "15/03- 22/03",
      team:"Pain,Vitality",
      statuss:"Active",
    },
    {
      id: 4,
      name: "PGL Major Antwerp 2022",
      duration: "16/03 - 23/03",
      team:"Og,ATK",
      statuss:"Active",
    },
    {
    id: 5,
    name: "Mid-Season Invitational",
    duration: "17/03 - 25/03",
    team:"FaZe Clan,Astralis",
    statuss:"Active"
    },
    {
    id: 6,
    name: "The International 2022",
    duration: "19/03 - 29/03",
    team:"Og,ATK",
    statuss:"Active"
    },
  ]);

  //Getting Data into columns from the useState

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Tournament-Name",
      dataIndex: "name",
    },
    {
        key: "3",
        title: "Participant",
        dataIndex: "team",
      },
    {
      key: "4",
      title: "Duration",
      dataIndex: "duration",
    },
    {
        key: "5",
        title: "Status",
        dataIndex: "statuss",
      },
      {
        key: "6",
        title: "Participant Details",
        render: (record) => {
            return (
              <>
              <Button size="small"
                  onClick={() => {
                    onViewParticipant(record);
                  }}>View</Button>
                
                <Button size="small"
                  onClick={() => {
                    onEditParticipant(record);
                  }}>Edit</Button>
              </>
            );
          },
        }, 
    {
      key: "7",
      title: "Actions",
      render: (record) => {
        return (
            <>
            <Button  size="small"
            onClick={() => {
              onViewStudent(record);
            }}>View</Button>
          
          <Button size="small"
            onClick={() => {
              onEditStudent(record);
            }}>Edit</Button>
          
          <Button size="small"
            onClick={() => {
              onDeleteStudent(record);
            }}
            style={{ color: "red", marginLeft: 12 }}>Delete</Button>
          
        </>
        );
      },
    },
  ];

  const Navigate = useNavigate();
  const logout=()=>{
    localStorage.removeItem("signUp")
    Navigate("/signin")
}
const deleteAccount=()=>{ 
  localStorage.clear()
  Navigate("/")
}
  
//Delete Button 

  const onDeleteStudent = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this student record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((student) => student.id !== record.id);
        });
      },
    });
  };


 //Actions section OnClick functions
  

  const onEditStudent = (record) => {
    setIsEditing(true);
    setEditingStudent({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null);
  };
  const onViewStudent = (record) => {
    setIsViewing(true);
    setViewingStudent({ ...record });
  };

  const resetViewing = () => {
    setIsViewing(false);
    setViewingStudent(null);
  };

 //Participant details section OnClick functions
  
  const onEditParticipant = (record) => {
    setIsEditingParticipant(true);
    setEditingParticipant({ ...record });
  };
  const resetParticipant = () => {
    setIsEditingParticipant(false);
    setEditingParticipant(null);
  };
  const onViewParticipant = (record) => {
    setIsViewingParticipant(true);
    setViewingParticipant({ ...record });
  };

  const resetViewingParticipant = () => {
    setIsViewingParticipant(false);
    setViewingParticipant(null);
  };
 
  return (
    <div className="Bg">
        <div className="App">
      <header className="App-header">
        <Table columns={columns} dataSource={dataSource}></Table>
       
{/*Modal box For the buttons in Actions Column*/}
       
        <Modal
          title="Edit Student"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setDataSource((pre) => {
              return pre.map((student) => {
                if (student.id === editingStudent.id) {
                  return editingStudent;
                } else {
                  return student;
                }
              });
            });
            resetEditing();
          }}
        >
          <Input
            value={editingStudent?.name}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, name: e.target.value };
              });
            }}
          />
          <Input
            value={editingStudent?.duration}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, duration: e.target.value };
              });
            }}
          />
          <Input
            value={editingStudent?.statuss}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, statuss: e.target.value };
              });
            }}
          />
        </Modal>
        
        <Modal
          title="Tournament"
          visible={isViewing}
          okText="Close"
          onCancel={() => {
            resetViewing();
          }}
          onOk={() => {
            resetViewing();
          }}
        >
          <Input
            value={viewingStudent?.name} 
          />
          <Input 
            value={viewingStudent?.duration}
          />
        </Modal>
 
  {/*Modal box For the buttons in Participant Details Column*/}
       
        <Modal
          title="Edit Student"
          visible={isEditingParticipant}
          okText="Save"
          onCancel={() => {
            resetParticipant();
          }}
          onOk={() => {
            setDataSource((pre) => {
              return pre.map((student) => {
                if (student.id === editingParticipant.id) {
                  return editingParticipant;
                } else {
                  return student;
                }
              });
            });
            resetParticipant();
          }}
        >
          <Input
            value={editingParticipant?.team}
            onChange={(e) => {
              setEditingParticipant((pre) => {
                return { ...pre, team: e.target.value };
              });
            }}
          />  
        </Modal>

        <Modal
          title="Tournament"
          visible={isViewingParticipant}
          okText="Close"
          onCancel={() => {
            resetViewingParticipant();
          }}
          onOk={() => {
            resetViewingParticipant();
          }}
        >
          <Input
            value={viewingParticipant?.team} 
          />
        </Modal>
      </header>
      <div className="Buttons">
      <Button type="dashed" style={{ background: "#d7562b" }} onClick={logout} className="logout">LogOut</Button> 
      <Button type="dashed" style={{ background: "#d7562b"  }}  onClick={deleteAccount} className="delete">Delete</Button>
      </div>
    </div>
    </div>
  );
}

export default Tournament;