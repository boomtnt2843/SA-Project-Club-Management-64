import { StudentCouncilInterface } from "./IStudentCouncil";
import { TeacherInterface } from "./ITeacher";
import { TypeClubInterface } from "./ITypeClub";

export interface ClubInterface {
    ID: number,
    Name: string,
	AdderID: number,
	Adder:   StudentCouncilInterface,
	AdviserID: number,
	Adviser:   TeacherInterface,
	TypeClubID: number,
	TypeClub:   TypeClubInterface,
}