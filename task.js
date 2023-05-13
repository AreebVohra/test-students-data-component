import StudentsPicker from '../components/StudentsPicker';
import StudentsTable from '../components/StudentsTable';
import { fetchStudentData, fetchSchoolData, fetchLegalguardianData } from '../utils';
import { useState } from 'react';


const studentsDataComponent = () => {
    const [studentsData, setStudentsData] = useState([]);
    const [schoolsData, setSchoolsData] = useState([]);
    const [legalguardiansData, setLegalguardiansData] = useState([]);

    const onStudentsPick = async (studentIds) => {
        try {
            const students = await Promise.all(studentIds.map(fetchStudentData));

            const schools = await Promise.all(
                students.map((student) => fetchSchoolData(student.schoolId))
            );

            const legalguardians = await Promise.all(
                students.map((student) => fetchLegalguardianData(student.legalguardianId))
            );

            setStudentsData(students);
            setSchoolsData(schools);
            setLegalguardiansData(legalguardians);
        } catch (error) {
            console.error('Error fetching student data:', error);
        }
    };


    return (
        <>
            <StudentsPicker onPickHandler={onStudentsPick} />
            <StudentsTable
                studentsData={studentsData}
                schoolsData={schoolsData}
                LegalguardiansData={legalguardiansData}
            />
        </>
    );
};


export default studentsDataComponent;
