package entity

import (
	"gorm.io/gorm"
)

type StudentCouncil struct {
	gorm.Model
	Name       string
	ID_Student string `gorm:"uniqueIndex"`
	Password   string
	Clubs      []Club `gorm:"foreignKey:AdderID"`
}

type Teacher struct {
	gorm.Model
	Name  string
	Clubs []Club `gorm:"foreignKey:AdviserID"`
}

type TypeClub struct {
	gorm.Model
	Name  string
	Clubs []Club `gorm:"foreignKey:TypeClubID"`
}

type Club struct {
	gorm.Model
	Name string

	AdderID *uint
	Adder   StudentCouncil

	AdviserID *uint
	Adviser   Teacher

	TypeClubID *uint
	TypeClub   TypeClub
}
